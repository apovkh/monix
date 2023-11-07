<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
	VAutocomplete,
	VBtn,
	VCard,
	VDatePicker,
	VDialog,
	VIcon,
	VRow,
	VTextField,
	VWindow,
	VWindowItem
} from 'vuetify/components'

import {
	mdiChartArc,
	mdiDumbbell,
	mdiFood,
	mdiGift,
	mdiHandCoinOutline,
	mdiHomeCity,
	mdiMinus,
	mdiPillMultiple,
	mdiPlus,
	mdiSilverwareForkKnife,
	mdiTrainCar
} from '@mdi/js'
import { useDateFormat, useVModel } from '@vueuse/core'

import { useWalletStore } from '../../stores/wallet'
import {
	CATEGORY_TYPES_COSTS,
	CATEGORY_TYPES_INCREASE,
	type IBalanceItem
} from '../../types/index'

const props = withDefaults(
	defineProps<{
		increase?: boolean
  }>(),
	{
		increase: true
	}
)
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue')
const wallerStore = useWalletStore()
const categoryTypes = reactive(Object.values(CATEGORY_TYPES_COSTS))
const selectedCategory = ref(
	props.increase
		? CATEGORY_TYPES_INCREASE.Increase
		: Object.values(CATEGORY_TYPES_COSTS)[0]
)

const amount = ref<number>(0)
const datePicker = ref(new Date())
const isError = ref<boolean>(false)

const dateFormat = computed(() => {
	return useDateFormat(datePicker.value, 'YYYY-MM-DD').value
})

const actionButtonText = computed((): string => {
	return props.increase
		? 'Add to balance'
		: 'Add costs'
})

const onChangeBalance = (): void => {
	if (!amount.value || amount.value < 0) {
		isError.value = true
		return
	}
	isError.value = false

	wallerStore.changeBalance({
		increase: props.increase,
		amount: props.increase ? amount.value : `-${amount.value}`,
		date: dateFormat.value,
		type: {
			icon: props.increase ? mdiHandCoinOutline : getIcon(selectedCategory.value),
			name: selectedCategory.value.toString()
		},
		id: uuidv4()
	})

	proxiedModelValue.value = false
}

const getIcon = (type: CATEGORY_TYPES_COSTS): string => {
	switch (type) {
	case CATEGORY_TYPES_COSTS.Food:
		return mdiFood
	case CATEGORY_TYPES_COSTS.Flat:
		return mdiHomeCity
	case CATEGORY_TYPES_COSTS.Medicine:
		return mdiPillMultiple
	case CATEGORY_TYPES_COSTS.Gift:
		return mdiGift
	case CATEGORY_TYPES_COSTS.Restaurants:
		return mdiSilverwareForkKnife
	case CATEGORY_TYPES_COSTS.Sport:
		return mdiDumbbell
	case CATEGORY_TYPES_COSTS.Transport:
		return mdiTrainCar

	default: return mdiFood
	}
}

const onCancel = (): void => {
	proxiedModelValue.value = false
}

watch(amount, (value) => {
	if (value > 0) {
		isError.value = false
	} else {
		isError.value = true
	}
})
</script>

<template>
 <VDialog
    v-model="proxiedModelValue"
    width="800"
  >
    <VCard
      title="Add balance"
    >
      <div class="p-4">
        <VTextField
          v-model="amount"
          label="Amount"
          type="number"
          :hide-details="true"
          class="mb-5"
          :error="isError"
          />

          <VAutocomplete
						v-if="!increase"
            v-model="selectedCategory"
            :items="categoryTypes"
            label="Category"
            class="mb-5"
          />

        <VDatePicker
          v-model="datePicker"
          show-adjacent-months
          width="400"
          class="mb-5"
        />

        <div class="flex flex-wrap gap-4 justify-end">
					<VBtn
						:rounded="true"
						color="gray"
						@click="onCancel"
					>
						Cancel
					</VBtn>
          <VBtn
            :rounded="true"
            color="green"
            @click="onChangeBalance"
          >
            {{ actionButtonText }}
          </VBtn>
        </div>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>
