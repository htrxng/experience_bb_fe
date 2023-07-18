<template>
  <div v-if="events != null" id="private-event">
    <h1>Private event</h1>
    <VButton v-bind:color="'green'" v-bind:text="'Add Event'" v-bind:link="'/add-event'">
    </VButton>
    <div v-for="(event,index) in events" :key="index" class="event-card">
      <div class="event-image">
        <swiper>
          <swiper-slide v-for="img in event.imgs" :key="img.url">
            <img :src="img.url" alt="Event Image">
          </swiper-slide>
        </swiper>
        <span class="qtyPhotos" v-if="event.imgs != null && event.imgs.length > 1"> + {{
            event.imgs.length - 1
          }} photos </span>
      </div>
      <div class="event-details">
<!--        <div>-->
<!--              <icon-button v-bind:icon="'mdi-dots-vertical'" v-bind:color="'black'">-->
<!--              </icon-button>-->
<!--              <icon-button v-bind:icon="'mdi-pencil-circle'" v-bind:color="'orange'"-->
<!--                           v-on:click="confirmDelete(event.id)"></icon-button>-->
<!--              <icon-button v-bind:icon="'mdi-trash-can'" v-bind:color="'red'"-->
<!--                           v-on:click="confirmDelete(event.id)"></icon-button>-->
<!--        </div>-->
        <div>
          <icon-button v-bind:icon="'mdi-dots-vertical'" v-bind:color="'black'" v-on:click="toggleDropdown"></icon-button>
          <div class="dropdown-menu" :class="{ hidden: !isDropdownOpen }">
            <icon-button v-bind:icon="'mdi-pencil-circle'" v-bind:color="'orange'" v-on:click="confirmDelete(event.id)"></icon-button>
            <icon-button v-bind:icon="'mdi-trash-can'" v-bind:color="'red'" v-on:click="confirmDelete(event.id)"></icon-button>
          </div>
        </div>
        <h2 class="event-title"> {{ event.title }} </h2>
        <div class="event-ratings">
          <!-- Điểm đánh giá hoặc sao đánh giá -->
        </div>
        <div id="div-event-description">
          <span>
          <mdi-icon v-bind:color="colorIcon" v-bind:icon="'mdi-information-outline'"></mdi-icon>
          </span>
          <p class="event-description">
            {{ event.description }}</p></div>
        timeline-clock-outline
        <div id="div-event-time">
          <span>
          <mdi-icon v-bind:color="colorIcon" v-bind:icon="'mdi-timeline-clock-outline'"></mdi-icon>
          </span>
          <p class="event-time"> {{ event.dateTimeRange.startDateTimeStr }} =>
            {{ event.dateTimeRange.endDateTimeStr }} </p>
        </div>
        <div id="div-event-location">
          <span>
          <mdi-icon v-bind:color="colorIcon" v-bind:icon="'mdi-map-marker'"></mdi-icon>
          </span>
          <p class="event-location">{{ event.location }}</p>
        </div>
        <div id="div-event-price">
          <span>
          <mdi-icon v-bind:color="colorIcon" v-bind:icon="'mdi-currency-usd'"></mdi-icon>
          </span>
          <p class="event-location">{{ event.price }}</p>
        </div>
        <!--        <div>-->
        <!--          <VButton v-bind:color="'orange'" v-bind:text="'Update'" v-bind:link="'/update-event/'+ event.id">-->
        <!--          </VButton>-->
        <!--          <icon-button v-bind:icon="'mdi-trash-can'" v-bind:color="'red'"-->
        <!--                       v-on:click="confirmDelete(event.id)"></icon-button>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../icons/SvgIcon";
import MdiIcon from "../icons/MdiIcon";
import IconButton from "../common_ui/IconButton";
import {swiper, swiperSlide} from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Swal from 'sweetalert2';
import VButton from "../common_ui/VButton"

export default {
  name: "PublicEventList",
  components: {
    "svg-icon": SvgIcon,
    MdiIcon,
    "icon-button": IconButton,
    swiper,
    swiperSlide,
    VButton,
  },
  data() {
    return {
      events: [],
      links: [],
      colorIcon: "green",
      showModal: false,
      isDropdownOpen: false
    }
  },
  async created() {
    await this.$http.get('/v1/private_event').then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.events = res.data;
      }
    });
  },
  methods: {
    async confirmDelete(eventId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          // Perform the delete action here
          // You can call an API or modify the necessary data
          // Once the delete is successful, show a success message
          console.log(eventId);
          this.$http.delete('/v1/private_event/' + eventId).then((res) => {
            console.log(res);
            this.events = res.data;
          }),
              Swal.fire(
                  'Deleted!',
                  'Your item has been deleted.',
                  'success'
              );
        }
      });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
  }
}
</script>

<style scoped>
#private-event {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  margin: 0;
}

.event-card {
  display: flex;
  align-items: center;
  width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
}

.event-image {
  max-width: 300px;
  max-height: 400px;
}

.qtyPhotos {
  border: 1px dotted grey;
  border-radius: 20px;
  background-color: #5C5C5C;
  color: white;
  align-items: center;
  padding: 7px;
  margin-top: 5px;
}

.event-image img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.event-details {
  flex: 1;
  margin-left: 16px;
}

.event-title {
  color: #2E2E2E;
  font-family: Open Sans, serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.event-ratings {
  margin-bottom: 8px;
}

#div-event-description {
  display: flex;
}

#div-event-time {
  display: flex;
}

#div-event-location {
  display: flex;
}

#div-event-price {
  display: flex;
}

.event-description {
  font-size: 18px;
  /*margin-bottom: 8px;*/
  padding-left: 3px;
}

.event-time,
.event-location {
  font-size: 14px;
  /*margin-bottom: 4px;*/
  padding-left: 3px;
}


.add-button .link {
  text-decoration: none;
  color: white;
}

.add-button .link:hover {
  background-color: darkgreen;
}

.add-button .link:focus {
  outline: none;
}
.dropdown-menu {
  position: absolute;
  z-index: 1;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px;
  margin-top: 8px;
  display: block; /* set the initial display property to block */
}

.dropdown-menu.hidden {
  display: none; /* add a hidden class to hide the dropdown menu */
}
</style>