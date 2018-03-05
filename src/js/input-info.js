/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el:　'main > .input-info-wrapper',
        template: `<h3>歌曲详情</h3>
        <form class="input-info-area clearfix">
        <img src="./img/song.jpg" alt="封面占位">
        <div class="input-info">
        <div class="form-row">
        <input type="text" class="short" name="name" placeholder="歌曲名字" value="__name__">
        <input type="text" class="short" name="singer" placeholder="歌手名字" value="__singer__">
        </div>
        <input type="text" class="long" name="url" placeholder="外链地址" value="__url__">
        <input type="submit" class="button" value="保存">
        </div>
        </form>`,
        init () {
          this.$el = $(this.el)
        },
        render (data = {}) {
            let placeholders = ['name', 'url', 'singer']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            this.$el.html(html)
            if (!data.id) {
                $(this.el).prepend('<h3>新建歌曲</h3>')
            } else {
                $(this.el).prepend('<h3>编辑歌曲</h3>')
            }
        }
    }

    let model = {
        data: {
            name: '',
            singer: '',
            url: ''
        },
        create({name, singer, url, id}) {
            // 声明类型
            let Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();

            return song.save({
                name, singer, url
            }).then( (response) => {
                let {id, attributes} = response
                Object.assign(this.data, {
                    id,
                    ...attributes
                })
                // this.data = {id, ...attributes}
            },  (error) => {
                console.error(error)
            })
        }
    }
    let controller = {
        init (view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEvent()
            window.eventHub.on('upload', (data) => {
                this.view.render(data)
            })
            window.eventHub.on('select', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', (data) => {
                this.model.data = {
                    name: '',
                    singer: '',
                    url: ''
                }
                this.view.render(this.model.data)

            })
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let params = 'name singer url'.split(' ')
                let data = {}
                params.map((string) => {
                    data[string] = this.view.$el.find(`[name ="${string}"]`).val()
                })
                this.model.create(data)
                    .then(() => {
                        console.log(this.model.data);
                        let object = JSON.parse(JSON.stringify(this.model.data))
                        window.eventHub.emit('create', object)
                        this.reset()
                    })
            })
        },
        reset() {
            console.log(11);
            this.view.render({})
        }
    }
    controller.init(view, model)
}