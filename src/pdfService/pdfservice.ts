import * as PDFDocument from 'pdfkit'

export class Pdfservice {

    async generatePDF(imagePath: any): Promise<Buffer> {

        const pdfBuffer: Buffer = await new Promise(resolve => {
          const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
          })
    
          // customize your PDF document
          const setWidth = 189.9;
          const setHeight = 264.5;
          const gutter = 5
          let x = gutter;
          let x1 = x + setWidth + gutter;
          let x2 = x1 + setWidth + gutter;
    
          let y = gutter;
          let y1 = y +setHeight + gutter;
          let y2 = y1 + setHeight + gutter;
    
          let xs = [];
          let ys = [];
    
          xs.push(x)
          xs.push(x1)
          xs.push(x2)
          ys.push(y)
          ys.push(y1)
          ys.push(y2)
    
          for (let i = 0; i <= xs.length -1; i++) {
            for (let y = 0; y <= ys.length -1; y++) {
              doc.image(imagePath, xs[i], ys[y], {width: setWidth})
            }
          }
    
          doc.end()
    
          const buffer = []
          doc.on('data', buffer.push.bind(buffer))
          doc.on('end', () => {
            const data = Buffer.concat(buffer)
            resolve(data)
          })
        })
    
        return pdfBuffer
      }
}