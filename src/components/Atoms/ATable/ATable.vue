<script setup lang="ts">
import {
	VBtn,
	VIcon,
	VTable
} from 'vuetify/components'

import {
	mdiCommentProcessingOutline,
	mdiDeleteEmpty
} from '@mdi/js'

import { LSection } from '../../../components'

import type { IATablePropsTypes } from './'

defineProps<IATablePropsTypes>()

const emit = defineEmits<{
  (e: 'remove-balance-item', value: number): void
}>()

const onClickRemoveBalanceItem = (id: number | number): void => {
	emit('remove-balance-item', id)
}
</script>

<template>
  <LSection
		:title="title"
		:subtitle="subtitle"
	>
		<VTable
      v-if="data.length"
      fixed-header
      rounded
    >
      <tbody>
        <tr
          v-for="item in data"
          :key="item.date"
          :class="[
            { 'bg-green': item.income },
            'text-sm bg-background'
          ]"
        >
          <td>
            <VIcon :icon="item.icon" />
          </td>
          <td>
              <div>
                {{ item.amount }}
                <small class="opacity-50">UAH</small>
              </div>
              <span
                class="-mt-4 d-inline-block text-xs opacity-50"
              >
              {{ item.date }}
            </span>
          </td>
          <td>
            <VTooltip
              v-if="item.comment"
              :text="item.comment"
            >
              <template v-slot:activator="{ props }">
                <VIcon
                  v-bind="props"
                  :icon="mdiCommentProcessingOutline"
                />
              </template>
            </VTooltip>
          </td>
          <td class="text-right">
            <VBtn
              variant="text"
              @click="onClickRemoveBalanceItem(item.id)"
            >
              <VIcon
                color="red"
                :icon="mdiDeleteEmpty"
              />
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
	</LSection>
</template>

<style lang="scss">
//
</style>
