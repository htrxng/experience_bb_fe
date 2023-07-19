<template>
  <div id="event-detail">
    <div class="title">
      <h1> {{ privateEvent.title }}</h1>
    </div>
    <div class="imgs-container">
      <div class="main-img">
        <img :src="imgsToDisplay[0].url">
      </div>
      <div class="secondary-img">
        <div class="secondary-img-1">
          <img :src="imgsToDisplay[1].url">
        </div>
        <div class="secondary-img-2">
          <img :src="imgsToDisplay[2].url">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "EventDetail",
  data() {
    return {
      id: this.$route.params.id,
      privateEvent: {
        id: '',
        title: '',
        description: "",
        dateTimeRange: {
          startDateTimeStr: "",
          endDateTimeStr: "",
          startDateTimeUnix: 0,
          endDateTimeUnix: 0,
          timezone: ""
        },
        location: "",
        price: 0,
      },
      imgsToDisplay: [],
    }
  },
  async created() {
    await this.$http.get('/v1/private_event/' + this.id).then((res) => {
      if (res.status === 200) {
        this.privateEvent.title = res.data.title;
        this.privateEvent.description = res.data.description;
        this.privateEvent.dateTimeRange = res.data.dateTimeRange;
        this.privateEvent.location = res.data.location;
        this.privateEvent.price = res.data.price;
        if (res.data.imgs != null) {
          let imgQty = res.data.imgs.length;
          for (let i = 0; i < imgQty; i++) {
            this.imgsToDisplay.push(res.data.imgs[i]);
          }
        }
        console.log(this.imgsToDisplay);
      }
    })
  }
}
</script>

<style scoped>
#event-detail {
  box-sizing: border-box;
  width: 80%;
  margin: 0;
}

.imgs-container {
  display: flex;
}

.main-img {
  width: 75%;
}
.main-img img {
  max-width: 100%;
}
.secondary-img {
  width: 25%;
}
.secondary-img img  {
  width: 100%;
}

</style>