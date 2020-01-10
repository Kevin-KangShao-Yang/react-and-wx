import React,{useState,useEffect} from 'react'
import axios from 'axios'

function UseEffect(){
    /**
     * useState 是一个函数，接收一个值作为初始值
     * 返回值是一个数组，元素1 是获取值的变量，元素2 更改模型值的方法
     */
    const [count,setCount] = useState(0)
    const [name,setName] = useState('张三')
    const [swipers,setSwipers] = useState(null)

    /**
     * 只有 count 的值发生变化之后，才执行里面的代码
     */
    useEffect(() => {
        console.log('----useEffect--dom-----')
        // 操作dom
        document.title = count
    },[count])

    /**
     * 如果我们想 useEffect中的代码从始至终只执行一次，那么我们可以，在第二个参数上面
     * 写上 []
     */
    useEffect(() => {
        console.log('----useEffect--ajax-----')
        // 获取数据
        async function getSwiper(){
            const result = await axios.get('http://localhost:8080/home/swiper')

            setSwipers(result.data.body)
        }

        getSwiper()
    },[])

    return <div>
        count is {count}<br/>
        <button onClick={() => setCount(count + 1)}>+1</button><br/>
        name is {name}<br/>
        <input value={name} type="text" onChange={e => setName(e.target.value)}/><br/>
        <ul>
            {
              swipers && swipers.map(item => {
              return <li key={item.id}>{item.id}---{item.imgSrc}</li>
              })  
            }
        </ul>
    </div>  
} 

export default UseEffect