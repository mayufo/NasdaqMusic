{
    let view = {
        el: '.recommend .new-content',
        init() {
            this.$el = $(this.view)
        },
        render(data) {
            console.log(data);
            let songs = data.songs

            songs.map((song) => {
                console.log(song)
                let $li = $(`
                <li data-id=${song.id}>
                    <h4>${song.name}</h4>
                    <div>${song.singer} </div>
                    <i class="iconfont icon-play"></i>
                </li>`)
                this.$el.find('.new-content').append($li)
            })
        }
    }
    let model = {
        data: {
            songs: [],
            // selectId: null
        },
        find () {
            let query = new AV.Query('Song')
            return query.find().then((response) => {
                this.data.songs = response.map((song) => {
                    return {id: song.id, ...song.attributes}
                })
                return response
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvent()
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        bindEvent () {

        }
    }

    controller.init(view, model)
}