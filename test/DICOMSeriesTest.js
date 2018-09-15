import test from 'ava'
import path from 'path'

const IntTypes = require(path.resolve(__dirname, '..', 'dist', 'IntTypes.js'))
const PixelTypes = require(path.resolve(__dirname, '..', 'dist', 'PixelTypes.js'))
const readImageLocalDICOMFileSeries = require(path.resolve(__dirname, '..', 'dist', 'readImageLocalDICOMFileSeries.js'))

test('Test reading a DICOM file', t => {
  const testSeriesDirectory = path.resolve(__dirname, '..', 'build', 'ExternalData', 'test', 'Input', 'DicomImageOrientationTest')
  return readImageLocalDICOMFileSeries(testSeriesDirectory).then(function (image) {
    t.is(image.imageType.dimension, 3, 'dimension')
    t.is(image.imageType.componentType, IntTypes.UInt8, 'componentType')
    t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
    t.is(image.imageType.components, 1, 'components')
    t.is(image.origin[0], -17.3551, 'origin[0]')
    t.is(image.origin[1], -133.9286, 'origin[1]')
    t.is(image.origin[2], 116.7857, 'origin[2]')
    t.is(image.spacing[0], 1.0, 'spacing[0]')
    t.is(image.spacing[1], 1.0, 'spacing[1]')
    t.is(image.spacing[2], 1.3000000000000007, 'spacing[2]')
    t.is(image.direction.getElement(0, 0), 0.0, 'direction (0, 0)')
    t.is(image.direction.getElement(0, 1), 0.0, 'direction (0, 1)')
    t.is(image.direction.getElement(0, 2), -1.0, 'direction (0, 2)')
    t.is(image.direction.getElement(1, 0), 1.0, 'direction (1, 0)')
    t.is(image.direction.getElement(1, 1), 0.0, 'direction (1, 1)')
    t.is(image.direction.getElement(1, 2), 0.0, 'direction (1, 2)')
    t.is(image.direction.getElement(2, 0), 0.0, 'direction (2, 0)')
    t.is(image.direction.getElement(2, 1), -1.0, 'direction (2, 1)')
    t.is(image.direction.getElement(2, 2), 0.0, 'direction (2, 2)')
    t.is(image.size[0], 256, 'size[0]')
    t.is(image.size[1], 256, 'size[1]')
    t.is(image.size[2], 3, 'size[2]')
    t.is(image.data.length, 3 * 65536, 'data.length')
    t.is(image.data[1000], 5, 'data[1000]')
  })
})
