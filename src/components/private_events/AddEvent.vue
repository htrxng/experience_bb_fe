<template>
  <div>
    <p v-if="isCreated">Create successful!!</p>
    <div id="addEvent">
      <VButton v-bind:color="'blue'" v-bind:text="'Back to Event List'" v-bind:link="'/'">
      </VButton>
      <form class="event-form">
        <h2 class="form-title">Create new Event</h2>
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
        <div v-if="selectedImage">
          <img id="imageSelected" :src="selectedImage" alt="Event Image">
        </div>
        <button type="button" v-on:click="submitForm" class="submit-button">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import VButton from "../common_ui/VButton"

export default {
  components: {
    VButton,
  },
  name: "AddEvent",
  data() {
    return {
      isCreated: false,
      privateEvent: {
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
      imgs: [],
      selectedFile: null,
      selectedImage: null
    }
  },
  mounted() {
    this.getTimezone();
  },
  methods: {
    submitForm: async function () {
      this.imgs.push(this.selectedFile);
      console.log(this.privateEvent);
      const imageContents = await Promise.all(this.imgs.map(this.readFileAsBase64));

      const requestDataPrivateEvent = {
        privateEventRequest: {
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

      this.$http.put('/v1/private_event', requestDataPrivateEvent)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            if (error.response && error.response.status === 405) {
              console.log('Method Not Allowed');
            } else {
              console.log('An error occurred:', error.message);
            }
          });
    },
    getTimezone() {
      const date = new Date();
      this.privateEvent.dateTimeRange.timezone = date.toString().match(/\((.*)\)/)[1];
      console.log('Timezone:', this.privateEvent.dateTimeRange.timezone);
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.selectedImage = URL.createObjectURL(this.selectedFile);
      console.log(this.selectedImage)
      // this.selectedFile = this.selectedFile.JSON.stringify()
    },
    async readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
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
  width: 600px;
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

#divVisibleInHomePage {
  display: flex;
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

#imageSelected {
  max-width: 200px;
  max-height: 300px;
}
</style>