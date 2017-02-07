import fs from 'fs-promise'
import path from 'path'
import unzip from 'unzip'
import request from 'request'

const languagesDir = path.join(__dirname, '..', 'languages')
const rawDir = path.join(languagesDir, 'raw')
const extractedDir = path.join(languagesDir, 'extracted')
const unzipPath = `${rawDir}/repo`
const repoPath = `${unzipPath}/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words-master`


const downloadRepo = () => new Promise((resolve, reject) => {
  request('https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/archive/master.zip')
    .pipe(unzip.Extract({ path: unzipPath }))
    .on('close', resolve)
    .on('error', reject)
})

const getFiles = async () => {
  const dir = (await fs.readdir(repoPath))
    .filter(file => !(['LICENSE', 'README.md', 'USERS.md'].includes(file)))

  const files = await Promise.all(
    dir.map(async filename => ({
      filename,
      words: await fs.readFile(`${repoPath}/${filename}`, 'utf8')
    }))
  )

  const toArray = files
    .map(file => ({
      ...file,
      words: file.words.split('\n').filter(words => words.length)
    }))

  return toArray
}

const saveFiles = async array => await (
  Promise.all(
    array.map(({ filename, words }) => (
      fs.writeFile(`${extractedDir}/${filename}.json`, JSON.stringify(words, null, 2))
    ))
  )
)


downloadRepo()
  .then(getFiles)
  .then(saveFiles)
  .then(() => console.log('Update successful'))
  .catch(console.error)
