<template>
  <div>
    <div id="updateEvent">
      <VButton v-bind:color="'blue'" v-bind:text="'Back to Event List'" v-bind:link="'/'">
      </VButton>
      <form class="event-form">
        <h2 class="form-title">Update Event</h2>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" v-model="privateEvent.title" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" name="description" v-model="privateEvent.description" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="dateTimeRange">Time Range Event</label>
          <div id="timeRangeEvent">
            <div id="startTime">
              <label for="startTimeEvent">Start Time:</label>
              <input type="datetime-local" id="startTimeEvent" name="startTimeEvent"
                     v-model="privateEvent.dateTimeRange.startDateTimeStr" required>
            </div>
            <div id="endTime">
              <label for="endTimeEvent">End Time:</label>
              <input type="datetime-local" id="endTimeEvent" name="endTimeEvent"
                     v-model="privateEvent.dateTimeRange.endDateTimeStr" required>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" id="location" v-model="privateEvent.location" name="location" required>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" step="0.01" id="price" name="price" v-model="privateEvent.price" required>
        </div>
        <div class="form-group">
          <label for="pictures">Images</label>
          <input type="file" id="pictures" name="pictures" @change="handleFileUpload" multiple>
        </div>
        <div v-for="(img,index) in imgsToDisplay" :key="index" class="image-container">
          <img class="eventImages" :src="img.url != null ? img.url : img"
               alt="Event Image">
          <span class="close-icon" @click="handleClick(index)">
            <mdi-icon v-bind:color="'red'" v-bind:icon="'mdi-close-circle-outline'"></mdi-icon>
          </span>
        </div>
        <div>
          <button type="button" v-on:click="submitForm" class="submit-button">Save</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import VButton from "../common_ui/VButton"
import Swal from 'sweetalert2';
import SvgIcon from "../icons/SvgIcon";
import MdiIcon from "../icons/MdiIcon";

export default {
  name: "UpdateEvent",
  components: {
    VButton,
    "svg-icon": SvgIcon,
    MdiIcon,
  },
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
      imgsToSave: [],
      selectedFile: null,
      selectedImage: null,
    }
  },
  async created() {
    console.log("id" + this.id);
    await this.$http.get('/v1/private_event/' + this.id).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.privateEvent.title = res.data.title;
        this.privateEvent.description = res.data.description;
        this.privateEvent.dateTimeRange = res.data.dateTimeRange;
        this.privateEvent.location = res.data.location;
        this.privateEvent.price = res.data.price;
        if (res.data.imgs != null) {
          let imgQty = res.data.imgs.length;
          for (let i = 0; i < imgQty; i++) {
            this.imgsToDisplay.push(res.data.imgs[i]);
            this.imgsToSave.push(res.data.imgs[i]);
          }
        }
        console.log(this.imgsToDisplay);
      }
    })
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.selectedImage = URL.createObjectURL(this.selectedFile);
      console.log(this.imgsToDisplay)
      this.imgsToDisplay.push(this.selectedImage);
      this.imgsToSave.push(this.selectedFile)
      console.log(this.imgsToDisplay)
      console.log(this.imgsToSave)
    }
    ,
    submitForm: async function () {
      console.log(this.imgsToSave)
      const imageContents = await Promise.all(this.imgsToSave.map(this.readFileAsBase64));
      const requestDataPrivateEvent = {
        privateEventRequest: {
          id: this.id,
          title: this.privateEvent.title,
          description: this.privateEvent.description,
          dateTimeRange: {
            startDateTimeStr: this.privateEvent.dateTimeRange.startDateTimeStr,
            endDateTimeStr: this.privateEvent.dateTimeRange.endDateTimeStr,
            startDateTimeUnix: this.privateEvent.dateTimeRange.startDateTimeUnix,
            endDateTimeUnix: this.privateEvent.dateTimeRange.endDateTimeUnix,
            timezone: this.privateEvent.dateTimeRange.timezone
          },
          location: this.privateEvent.location,
          price: this.privateEvent.price,
        },
        imgs: imageContents
      };
      console.log(requestDataPrivateEvent);
      this.$http.put('/v1/private_event/update-event', requestDataPrivateEvent)
          .then(response => {
            console.log(response.data);
            Swal.fire(
                'Updated!',
                'Event ' + requestDataPrivateEvent.privateEventRequest.title + ' updated successful!',
                'success'
            );
          })
          .catch(error => {
            if (error.response && error.response.status === 405) {
              console.log('Method Not Allowed');
            } else {
              console.log('An error occurred:', error.message);
            }
          });
    }
    ,
    async readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };

        reader.onerror = reject;

        if (file instanceof Blob) {
          reader.readAsDataURL(file);
        } else {
          reject(new Error('Invalid file type. Expected a Blob.'));
        }
      });
    },
    handleClick(index) {
      console.log(index)
      this.imgsToDisplay.splice(index,1);
      this.imgsToSave.splice(index,1);
    }
  }
}
</script>

<style scoped>
body {
  background-color: #c8e6c9; /* Màu xanh lá cây */
}

.event-form {
  background-color: #fff; /* Màu trắng */
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  margin: 20px auto;
  border: 2px solid #4caf50; /* Màu viền xanh lá cây */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng đổ */
}

.form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

#timeRangeEvent {
  display: flex;
  justify-items: center;
}

#startTime {
  margin-right: 20px;
  justify-items: center;
}

#timeRangeEvent label {
  font-size: 12px;
  color: blue;
  font-weight: lighter;
}

#endTime {
  margin-left: 20px;
  justify-items: center;
}

.submit-button {
  background-color: #4caf50; /* Màu xanh lá cây đậm */
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 16px;
}

.submit-button:hover {
  background-color: #45a049; /* Màu xanh lá cây nhạt */
}

.eventImages {
  max-width: 200px;
  max-height: 300px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.close-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
}
</style>