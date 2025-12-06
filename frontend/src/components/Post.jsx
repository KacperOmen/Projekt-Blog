import exampleImage from '../assets/exampleImage.jpg'

const Post = () => {
  return (
    <div className='flex gap-x-5'>
        <div>
            <img src={exampleImage} alt='example image' className='object-cover w-full h-[200px] m-5'></img>
        </div>
        <div className='flex flex-col w-full m-5'>
            <div className='flex flex-col gap-y-5 mb-5'>
                <h2 className='font-bold text-4xl'>Tytuł</h2>
                <p className='text-2xl'>Autor Data</p>
            </div>       
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est libero commodi quod corrupti vitae nemo deserunt similique nulla alias nesciunt incidunt eveniet ut, porro aliquid dolores. Tempora natus voluptatem voluptates?</p>               
        </div>
    </div>
  )
}

export default Post
