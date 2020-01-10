import React,{useState} from 'react'

function UseState(props){
    /**
     * useState 是一个函数，接收一个值作为初始值
     * 返回值是一个数组，元素1 是获取值的变量，元素2 更改模型值的方法
     */
    const [count,setCount] = useState(5)
    const [name,setName] = useState('张三')

    return <div>
        count is {count}<br/>
        <button onClick={() => setCount(count + 1)}>+1</button><br/>
        name is {name}<br/>
        <input value={name} type="text" onChange={e => setName(e.target.value)}/>
        <hr/>
        name is {props.name} --- age is {props.age}
    </div>  
} 

export default UseState