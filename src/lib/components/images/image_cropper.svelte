<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	export let defaultImage: string = 'screenshots/eric.jpg'; // Path to default image
	export let currentImage: string | null = null; // Current profile image URL
	export let onImageCropped: (blob: Blob) => Promise<void>; // Callback for handling cropped image

	let imageElement: HTMLImageElement;
	let cropper: Cropper | null = null;
	let isModalOpen = false;
	let uploadedImageUrl: string | null = null;
	let cropperInstance: Cropper | null = null;

	const CROP_WIDTH = 200; // Static width for profile picture
	const CROP_HEIGHT = 200; // Static height for profile picture

	onMount(() => {
		// Initialize with default or current image
		if (!currentImage && defaultImage) {
			currentImage = defaultImage;
		}
	});

	onDestroy(() => {
		if (cropperInstance) {
			cropperInstance.destroy();
		}
		// Cleanup any object URLs
		if (uploadedImageUrl) {
			URL.revokeObjectURL(uploadedImageUrl);
		}
	});

	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			// Revoke previous URL if exists
			if (uploadedImageUrl) {
				URL.revokeObjectURL(uploadedImageUrl);
			}

			uploadedImageUrl = URL.createObjectURL(file);
			isModalOpen = true;

			// Initialize cropper after modal is shown
			setTimeout(() => {
				if (imageElement) {
					if (cropperInstance) {
						cropperInstance.destroy();
					}

					cropperInstance = new Cropper(imageElement, {
						aspectRatio: 1,
						viewMode: 1,
						dragMode: 'move',
						autoCropArea: 1,
						cropBoxResizable: false,
						cropBoxMovable: true,
						zoomable: true,
						minCropBoxWidth: CROP_WIDTH,
						minCropBoxHeight: CROP_HEIGHT
					});
				}
			}, 100);
		}
	}

	async function saveCroppedImage() {
		if (cropperInstance) {
			const canvas = cropperInstance.getCroppedCanvas({
				width: CROP_WIDTH,
				height: CROP_HEIGHT
			});

			canvas.toBlob(
				async (blob) => {
					if (blob) {
						try {
							await onImageCropped(blob);
							currentImage = URL.createObjectURL(blob);
							closeModal();
						} catch (error) {
							console.error('Error saving cropped image:', error);
							// Handle error appropriately
						}
					}
				},
				'image/webp',
				0.9
			);
		}
	}

	function closeModal() {
		isModalOpen = false;
		if (cropperInstance) {
			cropperInstance.destroy();
			cropperInstance = null;
		}
	}
</script>

<div class="col-span-full mt-5">
	<label for="logo" class="block text-sm font-medium leading-6 text-white"> Logo (Optional) </label>
	<div class="mt-2 flex items-center gap-x-3">
		{#if currentImage}
			<img src={currentImage} alt="Profile" class="h-12 w-12 rounded-full object-cover" />
		{:else}
			<svg
				class="h-12 w-12 text-gray-300"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
		<label
			class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
		>
			Change
			<input type="file" accept="image/*" class="hidden" on:change={handleFileUpload} />
		</label>
	</div>
</div>

{#if isModalOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white p-4 rounded-lg max-w-2xl w-full">
			<div class="mb-4">
				<h3 class="text-lg font-semibold">Crop Image</h3>
			</div>
			<div class="max-h-[60vh] overflow-hidden">
				<img bind:this={imageElement} src={uploadedImageUrl} alt="Upload" class="max-w-full" />
			</div>
			<div class="mt-4 flex justify-end gap-2">
				<button
					type="button"
					class="px-4 py-2 text-gray-600 hover:text-gray-800"
					on:click={closeModal}
				>
					Cancel
				</button>
				<button
					type="button"
					class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					on:click={saveCroppedImage}
				>
					Save
				</button>
			</div>
		</div>
	</div>
{/if}
