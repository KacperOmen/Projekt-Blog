import {format} from "date-fns"
import { pl } from 'date-fns/locale'

const Post = ({title, summary, cover, content, createdAt, author}) => {
  return (
    <div className='flex gap-x-5'>
        <div>
            <img src={'http://localhost:3000/' + cover} alt='' className='object-cover w-full h-[200px] m-5'></img>
        </div>
        <div className='flex flex-col w-full m-5'>
            <div className='flex flex-col gap-y-5 mb-5'>
                <h2 className='font-bold text-4xl'>{title}</h2>
                <p className='text-2xl text-gray-500'>Autor: {author.username} | Data: {format(createdAt, 'd MMMM yyyy HH:mm', {locale: pl})}</p>
            </div>       
            <p>{summary}</p>               
        </div>
    </div>
  )
}

export default Post
