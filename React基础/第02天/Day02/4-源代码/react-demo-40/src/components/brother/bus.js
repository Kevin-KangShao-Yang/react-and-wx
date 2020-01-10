//导入events包
import { EventEmitter } from "events";  
//创建一个 bus 实例
const bus = new EventEmitter();
//默认导出bus
export default bus;
