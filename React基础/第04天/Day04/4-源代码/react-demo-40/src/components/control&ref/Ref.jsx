import React, { Component } from 'react';

class Ref extends Component {
    constructor() {
        super() 

        this.inputRef = React.createRef()
        this.fileRef = React.createRef()
    }

    handleSubmit = e => {
        e.preventDefault()

        console.log(this.fileRef.current.files[0])
    }

    render() {
        return (
            <div>
                Ref实例 <br/>
                {/* 旧的写法 */}
                {/* <input ref="inputRef" type="text"/> */}

                {/* 新的写法 */}
                {/* <input ref={this.inputRef} type="text"/> */}
                <form onSubmit={this.handleSubmit}>
                    <input type="file" ref={this.fileRef}/>
                    <br />
                    <button type="submit">上传</button>
                </form>
               
            </div>
        );
    }

    componentDidMount(){
        // console.log(this.refs.inputRef)
        // this.refs.inputRef.focus()

        // console.log(this.inputRef.current)

        // this.inputRef.current.focus()
    }
}

export default Ref;