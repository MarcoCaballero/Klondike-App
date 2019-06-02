# Fix CdkDragDrop sorting.

Reason: Disable sorting cards inside the different cdk-drop-list.

To avoid monkey-patching on angular drag-drop cdk, just override the files with these ones.

## Files

.\src\fixes\drag-drop.es5.js      ------------->  .\node_modules\@angular\cdk\esm5\drag-drop.es5.js
.\src\fixes\drag-drop.es5.js.map  ------------->  .\node_modules\@angular\cdk\esm5\drag-drop.es5.js.map
.\src\fixes\drag-drop.js          ------------->  .\node_modules\@angular\cdk\esm2015\drag-drop.js
.\src\fixes\drag-drop.js.map      ------------->  .\node_modules\@angular\cdk\esm2015\drag-drop.js.map
