const WishLink = {
  props: {
    url: String,
  },
  data() {
    return {
      urlRegEx: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
    }
  },
  computed: {
    isLink() {
      return this.url.match(this.urlRegEx)
    },
    domain() {
      return this.url.match(/(?:[\w-]+\.)+[\w-]+/)[0];
    },
  },
  template:
  `
  <a v-if="this.isLink" :href="url" target="_blank">{{ this.domain }}</a>
  <span v-else >{{ url }}</span>
  `
}
