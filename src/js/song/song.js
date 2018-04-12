
{
    let view = {
        el: '.dist-wrap',
        template: ` <img src="img/needle.png" class="needle" alt="">
        <div class="dist-content">
            <div class="dist-img"></div>
    <audio src={{url}}></audio><img  class="song-cover" src="{{img}}" alt="">
                <img class="ring" src="img/disc.png" alt="">
                <img class="light" src="img/disc-light.png" alt="">
                <i class="iconfont icon-17"></i>
                <div class="song-info">
                    <p class="name">{{name}}</p>
                    <p class="singer">歌手: {{singer}}</p>
                    <div class="lyrics">
                    </div>
                </div>
        </div>`,
        render(data) {
            $(this.el).html(this.template.replace('{{url}}', data.url).replace('{{img}}', data.img).replace('{{singer}}', data.singer).replace('{{name}}', data.name))
            $(this.el).find('.dist-img').css('background-image', `url(${data.img})`)
            let audio = $(this.el).find('audio').get(0)
            audio.onended = () => {
                this.pause()
            }
            audio.ontimeupdate = () => {
                this.showLyric(audio.currentTime)
            }
            $(this.el).find('audio')
            let lyrics = data.lyric.split('↵')
            lyrics.map((string) => {
                let matches = string.match(/\[([\d:.]+)](.+)/)
                let time = matches[1].split(':')
                let seconds = parseInt(time[0], 10) * 60 + parseFloat(time[1])
                let p = $('<p></p>').attr('data-time', seconds).html(matches[2])
                $(this.el).find('.lyrics').append(p)
            })

        },
        showLyric (time) {
            let allLyric = $(this.el).find('.lyrics > p')
            let p
            for (let i = 0; i < allLyric.length; i++) {
                if (i === allLyric.length - 1) {
                    p = allLyric[i]
                    break
                } else {
                    let currentTime = allLyric.eq(i).attr('data-time')
                    let nextTime = allLyric.eq(i+1).attr('data-time')
                    if (currentTime <= time && time < nextTime) {
                        p = allLyric[i]
                        break
                    }
                }
            }
            $(p).addClass('active').siblings('.active').removeClass()
            let lyricItemHeight = p.getBoundingClientRect().top
            let lyricsHeight = $(this.el).find('.lyrics > p')[0].getBoundingClientRect().top
            let height = lyricItemHeight - lyricsHeight > 78 ? lyricItemHeight - lyricsHeight - 78 : 0
            console.log(lyricItemHeight, lyricsHeight)

            $(this.el).find('.lyrics').animate({scrollTop: height}, 300)
        },
        play() {
            $(this.el).find('audio')[0].play()
            $(this.el).addClass('running')
            $(this.el).find('.needle').css('top', '-18px')
        },
        pause() {
            $(this.el).find('audio')[0].pause()
            $(this.el).removeClass('running')
            $(this.el).find('.needle').css('top', '-90px')


        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        isPlay: false,
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
                console.log(data)
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
            $(this.view.el).on('click', '.icon-17', () => {
                    this.view.play()
                    $('.icon-17').hide()
                    this.model.isPlay = true

            })
            $(this.view.el).on('click', '.light', () => {
                this.view.pause()
                $('.icon-17').show()
                this.model.isPlay = false
            })
        }
    }
    controller.init(view, model)
}
