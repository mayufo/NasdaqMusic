/**
 * Created by liuhuimin on 2018/3/3.
 */
window.eventHub = {
    events: {},
    // 发布
    emit(eventName, data) {
        for (let key in this.events) {
            if (key === eventName) {
                let fnList = this.events[key]
                fnList.map((fn) => {
                    fn.call(undefined, data)
                })
            }
        }
    },
    // 订阅
    on (eventName, fn) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    },
    off() {}
}