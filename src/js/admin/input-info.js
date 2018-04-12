/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el:　'main > .input-info-wrapper',
        template: `<form class="input-info-area clearfix">
        <!--<img src="./img/song.jpg" alt="封面占位">-->
        <div class="input-info">
            <div class="form-row">
                <input type="text" class="short" name="name" placeholder="歌曲名字" value="__name__">
                <input type="text" class="short" name="singer" placeholder="歌手名字" value="__singer__">
            </div>
            <input type="text" class="long" name="url" placeholder="外链地址" value="__url__">
            <input type="text" class="long" name="img" placeholder="封面地址" value="__img__">
            <textarea name="lyric">__lyric__</textarea>
            <input type="submit" class="button" value="保存">
        </div>
        </form>`,
        init () {
          this.$el = $(this.el)
        },
        render (data = {}) {
            let placeholders = ['name', 'url', 'singer', 'img', 'lyric']
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
            url: '',
            img: '',
            lyric: ''
        },
        create({name, singer, url, img, lyric, id}) {
            // 声明类型
            let Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();

            return song.save({
                name, singer, url, img, lyric
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
        },
        update (data) {
            let song = AV.Object.createWithoutData('Song', this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('img', data.img)
            song.set('lyric', data.lyric)
            return song.save().then((response) => {
                // 更新成功需要保存新数据
                Object.assign(this.data, data)
                return response
            })
        },
    }
    let controller = {
        init (view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEvent()
            window.eventHub.on('select', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', (data) => {
                // 说明
                if (this.model.data.id) {
                    // 存在于列表的数据，点击创建
                    this.model.data = {name: '', singer: '', url: '', img: '', lyric}
                } else {
                    // 上传歌曲以后，点击新建
                    Object.assign(this.model.data, data)
                }
                this.view.render(this.model.data)

            })
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                if (this.model.data.id) {
                    this.update()
                } else {
                    this.create()
                }

            })
        },
        update () {
            let params = 'name singer url img lyric'.split(' ')
            let data = {}
            params.map((string) => {
                data[string] = this.view.$el.find(`[name ="${string}"]`).val()
            })
            this.model.update(data)
                .then((response) => {
                    console.log(3, response, this.model.data)
                    window.eventHub.emit('update', JSON.parse(JSON.stringify(this.model.data)))
                })

        },
        create () {
            let params = 'name singer url img lyric'.split(' ')
            let data = {}
            params.map((string) => {
                data[string] = this.view.$el.find(`[name ="${string}"]`).val()
            })
            this.model.create(data)
                .then(() => {
                    let object = JSON.parse(JSON.stringify(this.model.data))
                    window.eventHub.emit('create', object)
                    this.reset()
                })
        },
        reset() {
            this.view.render({})
        }
    }
    controller.init(view, model)
}
