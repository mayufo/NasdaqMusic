/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el: 'main > .song-list-wrapper',
        template: `<h3>歌曲列表</h3>
        <ol class="song-list">
        </ol>`,
        clearActive () {
          this.$el.find('.active').removeClass('active')
        },
        init() {
          this.$el = $(this.el)
        },
        render(data) {
            this.$el.html(this.template)
            let {songs, selectId} = data
            let liList = songs.map((song) => {
                let $li = $('<li></li>').html(`<div class="long overflow">${song.name}</div><div class="short overflow">${song.singer}</div>`).attr('data-id', song.id)
                if (song.id === selectId) {
                    $li.addClass('active')
                    return $li
                }
                return $li
            })
            this.$el.find('ol').empty()

            liList.map((domLi) => {
                this.$el.find('ol').append(domLi)
            })
        }
    }
    let model = {
        data: {
            songs: [],
            selectId: null
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
        init (view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.getAllSongs()
            this.bindEvent()
            this.bindEventHub()

        },
        getAllSongs () {
            return this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        bindEvent () {
            this.view.$el.on('click', 'li', (e) => {
                let songId = $(e.currentTarget).attr('data-id')

                this.model.data.selectId = songId
                this.view.render(this.model.data)

                let data
                for (let i = 0; i < this.model.data.songs.length; i++) {
                    if(this.model.data.songs[i].id === songId) {
                        data = this.model.data.songs[i]
                        break
                    }
                }
                let object = JSON.parse(JSON.stringify(data))
                window.eventHub.emit('select', object)
            })
        },
        bindEventHub () {
            window.eventHub.on('create', (data) => {
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', () => {
                this.view.clearActive()
            })
            window.eventHub.on('update', (data) => {
                for (let i = 0; i < this.model.data.songs.length; i++) {
                    if (this.model.data.songs[i].id === data.id) {
                        Object.assign(this.model.data.songs[i], data)
                    }
                }
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}
