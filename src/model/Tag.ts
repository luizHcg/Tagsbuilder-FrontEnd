class Tag {
  set image (value: File | null) {
    if (value !== null) {
      this._image = value
    }
    const reader = new FileReader()

    if (value !== null) {
      reader.readAsDataURL(value)
      reader.onload = function () {
        const output: HTMLEmbedElement | null = document.querySelector(
          '.set-img-tag'
        )
        if (output !== null) {
          const result = reader.result
          if (typeof result === 'string') {
            output.src = result
          }
        }
      }
    } else {
      const output: HTMLEmbedElement | null = document.querySelector(
        '.set-img-tag'
      )
      if (output !== null) {
        output.src = require('../../assets/no-image.png')
      }
    }
  }

  get image (): File | null {
    return this._image ?? null
  }

  location!: string
  code?: number
  codeMaker?: number | string
  description?: string
  type = 'black' // 'black' -> estoque, 'red' -> exedente, 'secondary' -> filial
  private _image?: File
  pathImg?: string

  private SetDimensionsTag (
    Code: number,
    CodeMaker: number,
    Location: number,
    Description: number
  ) {
    this.fsCode = Code
    this.fsCodeMaker = CodeMaker
    this.fsLocation = Location
    this.fsDescription = Description
  }

  DimensionsTag (tag: string) {
    switch (tag) {
      case 'COD1':
        this.SetDimensionsTag(20, 12, 60, 12)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD2':
        this.SetDimensionsTag(18, 18, 30, 22)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD3':
        this.SetDimensionsTag(20, 12, 60, 12)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD4':
        this.SetDimensionsTag(0, 0, 35, 0)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD5':
        this.SetDimensionsTag(0, 0, 120, 0)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD6':
        this.SetDimensionsTag(0, 0, 42, 0)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      case 'COD7':
        this.SetDimensionsTag(10, 10, 30, 12)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
      default:
        this.SetDimensionsTag(0, 0, 0, 0)
        return {
          code: this.fsCode,
          codeMaker: this.fsCodeMaker,
          location: this.fsLocation,
          description: this.fsDescription
        }
    }
  }

  fsCode = 0
  fsCodeMaker = 0
  fsDescription = 0
  fsLocation = 0
}

export default Tag
