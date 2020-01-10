import React,{useRef,useLayoutEffect} from 'react'

function UseRef() {
    // 创建了 ref
    const inputRef = useRef()

    /**
     * dom阶段渲染完毕之后，再执行
     */
    useLayoutEffect(() => {
        inputRef.current.focus()
    })

    return <div>
        <input ref={inputRef} type="text"/>
    </div>
}

export default UseRef