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
import { useDateFormat } from '@vueuse/core'

import { LSection } from '../../../components'

import type { IATablePropsTypes } from './'

const props = defineProps<{
  data: IATablePropsTypes['data']
  title: IATablePropsTypes['title']
}>()

const emit = defineEmits<{
  (e: 'remove-item', value: number): void
}>()

const onClickRemoveBalance = (id: number | number): void => {
	emit('remove-item', id)
}
</script>

<template>
  <LSection
		:title="title"
		:subtitle="!data.length ? 'Список порожній' : undefined"
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
            { 'bg-green-darken-4': item.income },
            'text-sm'
          ]"
        >
          <td>
            <VIcon :icon="item.icon" /> <br>
            <span class="flex-shrink-0 mt-2 d-inline-block text-xs opacity-50">
                {{ item.date }}
              </span>
          </td>
          <td>
            <div class="inline-flex">
              <span class="flex-shrink-0">
                {{ item.amount }} <small class="opacity-50">UAH</small>
              </span>
            </div>
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
              @click="onClickRemoveBalance(item.id)"
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
