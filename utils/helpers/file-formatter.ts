interface downloadFileProps {
  file: Blob;
  filename: string;
  fileExtension: string;
}
export const downloadFile = ({
  file,
  filename,
  fileExtension,
}: downloadFileProps) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link: any = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.${fileExtension}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
