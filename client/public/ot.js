function applyOperation(text, operation) {
    if (operation.type === 'insert') {
      return text.slice(0, operation.index) + operation.text + text.slice(operation.index);
    } else if (operation.type === 'delete') {
      return text.slice(0, operation.index) + text.slice(operation.index + operation.length);
    }
    return text;
  }
  
  function apply(history, operation) {
    let transformedOperation = operation;
    for (const pastOperation of history) {
      transformedOperation = transform(transformedOperation, pastOperation);
    }
    return transformedOperation;
  }
  
  function transform(op1, op2) {
    // Simplified transformation logic (handle insert/delete conflicts)
    // This is a complex part of OT, requiring robust algorithms.
    if (op1.type === 'insert' && op2.type === 'insert') {
      if (op1.index >= op2.index) {
        op1.index += op2.text.length;
      }
    } else if (op1.type === 'delete' && op2.type === 'insert') {
      if (op1.index >= op2.index) {
        op1.index += op2.text.length;
      }
    } else if (op1.type === 'insert' && op2.type === 'delete') {
      if (op1.index > op2.index) {
        op1.index -= Math.min(op1.index - op2.index, op2.length);
      }
    } else if (op1.type === 'delete' && op2.type === 'delete') {
      if (op1.index > op2.index) {
          op1.index -= Math.min(op1.index - op2.index, op2.length);
      }
    }
    return op1;
  }
  
  module.exports = { applyOperation, apply, transform };