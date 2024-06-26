import modalTemplate from 'src/templates/components/modal.ejs';

export default function Modal({ classes, content }) {
  return modalTemplate({
    classes,
    content,
  });
}
