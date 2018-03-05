/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el: 'main > .song-list-wrapper',
        template: `<h3>歌曲列表</h3>
        <ol class="song-list">
            <!--<li v-for="song in songs"></li>-->
            <!--<li>-->
                <!--<div class="long">B-15 [Liberation, Catalysis]</div>-->
                <!--<div class="short">鷺巣詩郎</div>-->
                <!--<div class="short">5:00</div>-->
            <!--</li>-->
            <!--<li>-->
                <!--<div class="long">{禁じられた游び}(TV size)(OPテーマ)</div>-->
                <!--<div class="short">光宗信吉</div>-->
                <!--<div class="short">5:00</div>-->
            <!--</li>-->
            <!--<li>-->
                <!--<div class="long">川べりの家</div>-->
                <!--<div class="short">松崎名央</div>-->
                <!--<div class="short">5:00</div>-->
            <!--</li>-->
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
                let $li = $('<li></li>').html(`<div class="long">${song.name}</div><div class="short">${song.singer}</div><div class="short">${song.time}</div>`).attr('data-id', song.id)
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
                console.log(555, data);
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