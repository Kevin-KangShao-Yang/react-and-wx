import React,{Component} from 'react'
import bus from './bus'

export default class Brother2 extends Component{
    /**
    constructor(){
        super()

        this.state = {
            name:'',
            age:''
        }
    }
     */
    state = {
        name:'',
        age:''
    }

    // 组件挂载完毕之后执行，只会执行一次
    componentDidMount() {
        bus.on('myEvent',data => {
            // console.log(data,this)
            this.setState({
                name: data.name,
                age: data.age
            })
        })
    }

    render() {
        const {name,age} = this.state
        return <div>
            我是兄弟2<br/>
            {name} {age}
        </div>
    }
}