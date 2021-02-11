import PrintTag from '../model/PrintTag'
import Tag from '../model/Tag'

class CreateListTagsForPrint {
  public ListTags (listTagsForPrint: Array<PrintTag>): Array<Tag> {
    const list: Array<Tag> = []

    listTagsForPrint.forEach((obj: PrintTag) => {
      for (let i = 0; i < obj.quantity; i++) {
        list.push(obj.tag)
      }
    })

    const listTag: Array<Tag> = []
    for (let i = 0; i < list.length; i++) {
      listTag.push(list[i])
    }

    return listTag
  }
}

export default new CreateListTagsForPrint().ListTags
