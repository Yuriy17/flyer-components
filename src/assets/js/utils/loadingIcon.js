export function showLoadingIcon(container) {
  const loadingContainer = container.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.innerHTML = `<img src="${import.meta.env.VITE_STATIC_PATH}/images/loading.svg" alt="Loading..." class="loading-icon">`;
    loadingContainer.classList.remove('hidden');
  }
}

export function hideLoadingIcon(container) {
  const loadingContainer = container.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.innerHTML = ''; // Remove the loading icon element
    loadingContainer.classList.add('hidden');
  }
}
