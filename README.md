# Firefox DevTools Image Analyzer

ImgInspector is a powerful Firefox Developer Tools extension that provides comprehensive analysis and management of images on web pages. This tool is designed to help web developers and designers optimize their image usage, improve page load times, and enhance overall web performance.

## Features

- **Image Listing**: Displays all images loaded on the current page.
- **Detailed Information**: Shows comprehensive details for each image, including dimensions, file size, alt text, and more.
- **Sorting Capabilities**: Sort images by file size, dimensions, or file type.
- **Filtering**: Easily filter images based on their URL or alt text.
- **Summary Statistics**: View the total number of images and their combined file size.
- **Responsive Design**: Clean, user-friendly interface that adapts to the DevTools panel.

## Installation

1. Clone this repository or download the ZIP file.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" in the left sidebar.
4. Click on "Load Temporary Add-on".
5. Navigate to the directory where you cloned/extracted the plugin, and select the `manifest.json` file.

## Usage

1. Open Firefox Developer Tools (F12 or Ctrl+Shift+I).
2. Navigate to the "ImgInspector" tab.
3. The plugin will automatically analyze and display all images on the current page.
4. Use the sorting dropdown to organize images by size, dimensions, or type.
5. Use the filter input to search for specific images by URL or alt text.
6. Click the "Refresh" button to re-analyze the page after content changes.

## Development

To modify or enhance the plugin:

1. Make changes to the relevant files (`panel.html`, `panel.css`, `panel.js`).
2. Go to `about:debugging` in Firefox.
3. Find ImgInspector under "This Firefox" > "Temporary Extensions".
4. Click "Reload" to apply your changes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have any questions, please file an issue on the GitHub repository.