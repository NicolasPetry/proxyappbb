import * as PDFDocument from 'pdfkit'
import { SaveImgDto } from 'src/dto/saveImgDto';

export class Pdfservice {

    async generatePDF(imagePath: any): Promise<Buffer> {

        const pdfBuffer: Buffer = await new Promise(resolve => {
          const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
          })
    
          // customize your PDF document
          const widthInInches = 2.5;
          const lengthInches = 3.5;
          const oneInchIs72Points = 72;

          const setWidth = widthInInches * oneInchIs72Points;
          const setHeight = lengthInches * oneInchIs72Points;

          const gutter = 12
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
              doc.image(imagePath, xs[i], ys[y], {width: setWidth, height: setHeight})
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

      async generatePdfListOfCards(list: any[]) {

        const pdfBuffer: Buffer = await new Promise(resolve => {
          const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
          })
    
          // customize your PDF document
          const widthInInches = 2.5;
          const lengthInches = 3.5;
          const oneInchIs72Points = 72;

          const setWidth = widthInInches * oneInchIs72Points;
          const setHeight = lengthInches * oneInchIs72Points;

          const gutter = 14
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
    
          let illustration_id_pointer = 0;
          
          for (let i = 0; i <= xs.length -1; i++) {

            if (illustration_id_pointer + 1 === list.length) {
              break
          }

            for (let y = 0; y <= ys.length -1; y++) {

              

              doc.image(list[illustration_id_pointer], xs[i], ys[y], {width: setWidth, height: setHeight})

              if (illustration_id_pointer + 1 === list.length) {
                  break
              }
              else {
                illustration_id_pointer ++
              }
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

      pointsToInch() {

        const widthInInches = 2.5;
        const lengthInches = 3.5;

        let wP = widthInInches * 72;
        let lP = lengthInches * 72;

      }
}