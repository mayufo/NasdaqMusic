
{
    let view = {
        el: '#music',
        template: `<audio src={{url}}></audio>
        <div class="play">播放</div><div class="pause">暂停</div>`,
        render(data) {
            $(this.el).html(this.template.replace('{{url}}', data.url))
        },
        play() {
            let audio = $(this.el).find('audio')[0]
            audio.play()
        },
        pause() {
            let audio = $(this.el).find('audio')[0]
            audio.pause()
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        getSong() {
            let query = new AV.Query('Song')
            return query.get(this.data.id).then((song) => {
                Object.assign(this.data, song.attributes)
                return song
            })

        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.data.id = this.getSongId()
            this.model.getSong().then((data) => {
                this.view.render(this.model.data)
            })
            this.bindEvent()
        },
        getSongId () {
            let search = window.location.search
            let id = ''
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }

            // 可以防止当有多个&&， 可以过滤出空字符串
            let array = search.split('&').filter((v => v))
            for(let i = 0; i < array.length; i++) {
                let data = array[i].split('=')
                let key = data[0]
                let value = data[1]
                if (key === 'id') {
                    id = value
                }
            }
            return id
        },
        bindEvent() {
            $(this.view.el).on('click', '.play', () => {
                this.view.play()
            })
            $(this.view.el).on('click','.pause', () => {
                this.view.pause()
            })
        }
    }
    controller.init(view, model)
}