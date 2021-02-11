export const WritePermission = (visibleTag: string) => {
  switch (visibleTag) {
    case 'COD1':
      return {
        code: true,
        location: true,
        codeMaker: true,
        type: true,
        description: true,
        img: true
      }
    case 'COD2':
      return {
        code: true,
        location: true,
        codeMaker: true,
        type: false,
        description: true,
        img: true
      }
    case 'COD3':
      return {
        code: true,
        location: true,
        codeMaker: true,
        type: true,
        description: true,
        img: true
      }
    case 'COD4':
      return {
        code: false,
        location: true,
        codeMaker: false,
        type: false,
        description: false,
        img: false
      }
    case 'COD5':
      return {
        code: false,
        location: true,
        codeMaker: false,
        type: false,
        description: false,
        img: false
      }
    case 'COD6':
      return {
        code: false,
        location: true,
        codeMaker: false,
        type: false,
        description: false,
        img: false
      }
    case 'COD7':
      return {
        code: true,
        location: true,
        codeMaker: true,
        type: false,
        description: true,
        img: true
      }
  }
}
