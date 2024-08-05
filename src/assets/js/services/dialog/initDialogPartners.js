import axios from 'axios';
import dialogPartnersContentTemplate from 'src/templates/layouts/dialog/dialogPartnersContent.ejs';
import dialogPartnersCategoriesContentTemplate from 'src/templates/layouts/dialog/dialogPartnersCategoriesContent.ejs';
import { pasteByInsertPosition } from 'src/assets/js/helpers/helpers';
import { insertPosition } from 'src/assets/js/helpers/constants';

export const initDialogPartners = async ({ triggerButton, url }) => {
  if (triggerButton) {
    const dialogPartners = document.querySelector('.dialog-partners');
    if (dialogPartners) {
      // TODO
      // const partnersData = import.meta.env.PROD
      //   ? await axios.get('https://flyer-club.com/flightbooking/trustpilot?reviews=true&perpage=20')
      //   : await axios.get('/data/reviews.json');
      const partnersData = await axios.get(url);
      if(partnersData.status === 200) {
        const { tags, category } = partnersData.data;

        const dialogPartnersContent = dialogPartnersContentTemplate({
          tags,
          categoryContent: dialogPartnersCategoriesContentTemplate({
            category,
          }),
        });
        pasteByInsertPosition({
          insertPositionType: insertPosition.beforeend,
          parentElement: dialogPartners,
          child: dialogPartnersContent,
          callbackAfterPaste: (() => {
            const partnersDataTags = dialogPartners.querySelector('.partners-data__tags');
            const searchPanelElement = dialogPartners.querySelector('.search-panel');
            if(partnersDataTags) {
              const allValueConstant = 'All';
              const partnersDataTagElements = [...partnersDataTags.querySelectorAll('.partners-data__tag')];
              const tagAllElement = partnersDataTagElements.find((partnersDataTagElement) => partnersDataTagElement.dataset.value === allValueConstant)
              partnersDataTags.addEventListener('click', (e) => {
                const tagElement = e.target;
                if(tagElement) {
                  const tagValue = tagElement.dataset.value;
                  const variant = tagElement.getAttribute('variant');
                  if(variant === 'neutral') {
                    if(tagValue) {
                      if (tagValue === allValueConstant) {
                        partnersDataTagElements.forEach((partnersDataTagElement) => {
                          partnersDataTagElement.setAttribute('variant', 'neutral');
                        });
                      } else {
                        tagAllElement.setAttribute('variant', 'neutral');
                      }
                    }
                    tagElement.setAttribute('variant', 'primary');
                  } else {
                    tagElement.setAttribute('variant', 'neutral');
                  }
                }
              });
            }
            if(searchPanelElement) {
              const dialogPartnersInfo = dialogPartners.querySelector('.partners-data__info');
              searchPanelElement.addEventListener('sl-input', (e) => {
                const searchValue = e.currentTarget.value;
                const filtered = category.map(({title, links}) => {
                  const filteredLinks = links.filter(({ text }) => text.toLowerCase().includes(searchValue));
                  return { title, links: filteredLinks };
                });

                const child = dialogPartnersCategoriesContentTemplate({
                  category: filtered,
                });

                pasteByInsertPosition({
                  insertPositionType: insertPosition.inner,
                  parentElement: dialogPartnersInfo,
                  child,
                });
              })
            }
          }),
        });
        triggerButton.addEventListener('click', () => {
          dialogPartners.show();
        });
        const closeButton = dialogPartners.querySelector('.icon-menu');
        closeButton && closeButton.addEventListener('click', () => dialogPartners.hide());
      }
    }
  }
};
