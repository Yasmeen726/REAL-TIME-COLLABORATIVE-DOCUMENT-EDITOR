/ client/src/services/otService.js
export const applyOperation = (currentText, operation) => {
  if (operation.type === 'insert') {
    return currentText.slice(0, operation.index) + operation.text + currentText.slice(operation.index);
  } else if (operation.type === 'delete') {
    return currentText.slice(0, operation.index) + currentText.slice(operation.index + operation.length);
  }
  return currentText;
};

export const calculateChangeIndex = (oldText, newText) => {
    let index = 0;
    while(oldText[index] === newText[index] && index < Math.min(oldText.length, newText.length)){
        index++;
    }
    return index;
}