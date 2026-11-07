const form=document.querySelector('#reportForm');
const preview=document.querySelector('#reportPreview');
const previewActions=document.querySelector('#previewActions');
const issueLink=document.querySelector('#githubIssueLink');
const copyButton=document.querySelector('#copyReport');
const status=document.querySelector('#reportStatus');
const browserField=document.querySelector('#browserDetails');
let preparedReport='';

function browserSummary(){
  const lines=[navigator.userAgent];
  if(navigator.platform)lines.push(`Platform: ${navigator.platform}`);
  lines.push(`Screen: ${window.screen.width} × ${window.screen.height}`);
  lines.push(`Page: ${location.href}`);
  return lines.join('\n');
}

browserField.value=browserSummary();

function value(id,fallback='Not provided'){
  return document.querySelector(`#${id}`).value.trim()||fallback;
}

function buildReport(){
  const type=value('reportType');
  const summary=value('summary');
  return {
    type,
    summary,
    body:[
      `## ${type} report`,
      '',
      '### Summary',
      summary,
      '',
      '### Details',
      value('details'),
      '',
      '### Steps or workflow',
      value('steps'),
      '',
      '### Expected result',
      value('expected'),
      '',
      '### Actual result',
      value('actual'),
      '',
      '### File type',
      value('fileType','None specified'),
      '',
      '### Browser and device',
      value('browserDetails'),
      '',
      '---',
      'Prepared with the Plume report form. No image or project file was attached.'
    ].join('\n')
  };
}

form.addEventListener('submit',event=>{
  event.preventDefault();
  const report=buildReport();
  preparedReport=report.body;
  preview.textContent=preparedReport;
  const baseUrl='https://github.com/phillippplangetis/studio-/issues/new';
  const title=encodeURIComponent(`[${report.type}] ${report.summary}`);
  const fullUrl=`${baseUrl}?title=${title}&body=${encodeURIComponent(preparedReport)}`;
  const fitsInUrl=fullUrl.length<=7000;
  issueLink.href=fitsInUrl?fullUrl:`${baseUrl}?title=${title}`;
  issueLink.textContent=fitsInUrl?'Continue to GitHub':'Open GitHub and paste report';
  previewActions.hidden=false;
  status.textContent=fitsInUrl?'Report prepared. Review it, then continue to GitHub or copy it.':'This report is too long to prefill safely. Copy it, open GitHub, and paste it into the issue.';
});

form.addEventListener('reset',()=>{
  requestAnimationFrame(()=>{
    browserField.value=browserSummary();
    preparedReport='';
    preview.textContent='Complete the form and select “Prepare report.”';
    previewActions.hidden=true;
    status.textContent='';
  });
});

copyButton.addEventListener('click',async()=>{
  if(!preparedReport)return;
  try{
    await navigator.clipboard.writeText(preparedReport);
    status.textContent='Report copied to the clipboard.';
  }catch{
    const helper=document.createElement('textarea');
    helper.value=preparedReport;
    helper.style.position='fixed';
    helper.style.opacity='0';
    document.body.append(helper);
    helper.select();
    const copied=document.execCommand('copy');
    helper.remove();
    status.textContent=copied?'Report copied to the clipboard.':'Copy failed. Select the preview text and copy it manually.';
  }
});
