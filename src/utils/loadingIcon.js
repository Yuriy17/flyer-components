export function showLoadingIcon(container) {
  const loadingContainer = container.querySelector('.loading-container');
  loadingContainer.innerHTML = `<img src="assets/images/loading.svg" alt="Loading..." class="loading-icon">`;
  loadingContainer.classList.remove('hidden');
}

export function hideLoadingIcon(container) {
  const loadingContainer = container.querySelector('.loading-container');
  loadingContainer.innerHTML = ''; // Remove the loading icon element
  loadingContainer.classList.add('hidden');
}
