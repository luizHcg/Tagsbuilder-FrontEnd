import html2canvas from 'html2canvas'
import Pdf from 'jspdf'

class CreatePdf {
  private orientation = 'p'
  private width = 0
  private height = 0

  private RemovePaginationFromPage (canvas: HTMLElement) {
    canvas.querySelectorAll('.tb-pagination')
      .forEach((item) => {
        item.remove()
      })
  }

  private PrintCOD1 () {
    this.orientation = 'landscape'
  }

  private PrintCOD2 () {
    this.orientation = 'landscape'
  }

  private PrintCOD3 () {
    this.orientation = 'landscape'
    this.height = 833
  }

  private PrintCOD4 () {
    this.orientation = 'p'
  }

  private PrintCOD5 () {
    this.orientation = 'p'
  }

  public async Print (type: string) {
    switch (type) {
      case 'COD1':
        this.PrintCOD1()
        break
      case 'COD2':
        this.PrintCOD2()
        break
      case 'COD3':
        this.PrintCOD3()
        break
      case 'COD4':
        this.PrintCOD4()
        break
      case 'COD5':
        this.PrintCOD5()
        break
    }

    const canvas: HTMLElement | null = document.querySelector('#tb-preview')

    if (canvas !== null) { this.RemovePaginationFromPage(canvas) }

    const arrayElements = canvas?.children
    const doc = this.orientation === 'p' ? new Pdf('p', 'cm', 'a4', true) : new Pdf('l', 'cm', 'a4', true)

    const date = new Date()
    const pdfName = `D${date.getDate()}-M${date.getMonth()}-A${date.getFullYear()}-${date.getTime()}-tagbuilder`

    if (arrayElements && arrayElements.length >= 1) {
      for (let i = 0; i < arrayElements.length; i++) {
        const itemPage: Element | null = arrayElements.item(i)

        if (itemPage !== null) {
          await html2canvas((itemPage as HTMLElement), { scale: (type === 'COD3' ? 3 : 1) })
            .then((canvas) => {
              doc.setProperties({
                title: 'Etiquetas',
                author: 'Luiz.Henrique',
                creator: '© Luiz Henrique 2020'
              })

              const img: string | HTMLImageElement | HTMLCanvasElement | Uint8Array = canvas.toDataURL('image/png')

              this.width = doc.internal.pageSize.getWidth()
              this.height = doc.internal.pageSize.getHeight()

              const dividingBy38 = (n: number) => n / 38

              const x = type !== 'COD3' ? ((dividingBy38(canvas.width) - this.width) / 2) * (-1) : dividingBy38(20)
              const y = type !== 'COD3' ? ((dividingBy38(canvas.height) - this.height) / 2) * (-1) : dividingBy38(90)
              const w = type !== 'COD3' ? dividingBy38(canvas.width) : this.width - dividingBy38(40)
              const h = type !== 'COD3' ? dividingBy38(canvas.height) : this.height - dividingBy38(180)

              doc.addImage(img, 'PNG', x, y, w, h)

              if ((i + 1) === arrayElements.length) {
                doc.save(pdfName)
              }
            }).catch((err: Error) => console.log(err.message))
        }
      }
    }
  }
}

export default CreatePdf
