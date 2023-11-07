<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
	VAutocomplete,
	VBtn,
	VCard,
	VDatePicker,
	VDialog,
	VTextField
} from 'vuetify/components'

import { useDateFormat, useVModel } from '@vueuse/core'

import { useCategory } from '../../composables/useCategory'
import { useWalletStore } from '../../stores/wallet'
import {
	CATEGORY_TYPES_COSTS,
	CATEGORY_TYPES_INCOME,
	type IBalanceItem
} from '../../types/index'

const props = withDefaults(
	defineProps<{
		income?: boolean
  }>(),
	{
		income: true
	}
)
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue')
const wallerStore = useWalletStore()
const categoryComposable = useCategory()

const categoryTypes = reactive(Object.values(CATEGORY_TYPES_COSTS))
const selectedCategory = ref(CATEGORY_TYPES_COSTS.Food)

const amount = ref<number>(0)
const datePicker = ref(new Date())
const isError = ref<boolean>(false)

const dateFormat = computed(() => {
	return useDateFormat(datePicker.value, 'YYYY-MM-DD').value
})

const actionButtonText = computed((): string => {
	return props.income
		? 'Add to balance'
		: 'Add costs'
})

const titleText = computed((): string => {
	return props.income
		? 'Balance'
		: 'Costs'
})

const onChangeBalance = (): void => {
	if (!amount.value || amount.value < 0) {
		isError.value = true
		return
	}
	isError.value = false

	wallerStore.changeBalance({
		income: props.income,
		amount: props.income ? amount.value : `-${amount.value}`,
		date: dateFormat.value,
		type: {
			icon: categoryComposable.value[
				props.income
					? CATEGORY_TYPES_INCOME.Income
					: selectedCategory.value
			].icon,
			name: props.income
				? CATEGORY_TYPES_INCOME.Income
				: selectedCategory.value.toString()
		},
		id: uuidv4()
	} as IBalanceItem)

	proxiedModelValue.value = false
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
      :title="titleText"
    >
      <div>
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
						v-if="!income"
						v-model="selectedCategory"
						:items="categoryTypes"
						label="Category"
						class="mb-5"
					/>
				</div>

        <VDatePicker
          v-model="datePicker"
          show-adjacent-months
          width="400"
          class="mb-5"
        />

        <div class="flex flex-wrap gap-4 p-4 justify-end">
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
