<template>

  <div>

    <!-- Cannot match spec with current core modal -->
    <!-- Should be its own component -->
    <core-modal
      :title=" $tr('facilityPermissionsPresetDetailsHeader')"
      @cancel="hideFacilityPermissionsDetails"
      :enableBgClickCancel="true"
      v-if="permissionPresetDetailsModalShown">

      <dl class="permission-preset-human">
        <dt class="permission-preset-human-title">
          {{ permissionPresets.formal.name }}
        </dt>
        <dd class="permission-preset-human-detail">
          {{ $tr('disabledUserSelfSignupPermissionDetail') }}
        </dd>
        <dd class="permission-preset-human-detail">
          {{ $tr('enabledUserPasswordlessLoginPermissionDetail') }}
        </dd>
        <dd class="permission-preset-human-detail">
          {{ $tr('disabledAccountEditPermissionDetail') }}
        </dd>
      </dl>

      <dl class="permission-preset-human">
        <dt class="permission-preset-human-title">
          {{ permissionPresets.informal.name }}
        </dt>
        <dd class="permission-preset-human-detail">
          {{ $tr('enabledUserSelfSignupPermissionDetail') }}
        </dd>
        <dd class="permission-preset-human-detail">
          {{ $tr('enabledAccountEditPermissionDetail') }}
        </dd>
      </dl>

      <dl class="permission-preset-human">
        <dt class="permission-preset-human-title">
          {{ permissionPresets.nonformal.name }}
        </dt>
        <dd class="permission-preset-human-detail">
          {{ $tr('enabledUserSelfSignupPermissionDetail') }}
        </dd>
        <dd class="permission-preset-human-detail">
          {{ $tr('enabledAccountEditPermissionDetail') }}
        </dd>
      </dl>

      <span class="permission-preset-modal-dismiss-button-wrapper">
        <k-button
          class="permission-preset-modal-dismiss-button"
          :text="$tr('permissionsModalDismissText')"
          :primary="true"
          @click="hideFacilityPermissionsDetails"
        />
      </span>

    </core-modal>

    <onboarding-form
      :header="$tr('facilityPermissionsSetupFormHeader')"
      :submit-text="submitText"
      @submit="setPermissions">

      <template slot="description">
        {{ $tr('facilityPermissionsSetupFormDescription') }}

        <a class="permission-preset-modal-link" @click="showFacilityPermissionsDetails">
          {{ $tr('facilityPermissionsPresetDetailsLink') }}
        </a>
      </template>


      <label
        v-for="(preset, shorthand , index) in permissionPresets"
        class="permission-preset">
        <k-radio-button
          class="permission-preset-radio-button"
          v-model="selectedPermissionPreset"
          :autofocus="!index"
          :radiovalue="shorthand"
          :label="preset.name"
        />
        <span class="permission-preset-description">
          {{ descriptions[shorthand] }}
        </span>
      </label>

    </onboarding-form>

  </div>

</template>


<script>

  import { permissionPresets } from '../../../state/constants';
  import { submitFacilityPermissions } from '../../../state/actions/forms';

  import onboardingForm from '../onboarding-form';
  import kRadioButton from 'kolibri.coreVue.components.kRadioButton';
  import kButton from 'kolibri.coreVue.components.kButton';
  import coreModal from 'kolibri.coreVue.components.coreModal';

  export default {
    name: 'selectPermissionsForm',
    $trs: {
      facilityPermissionsSetupFormHeader: 'Choose a Facility setup',
      facilityPermissionsSetupFormDescription:
        'How will you be using Kolibri? You can customize these settings later.',
      facilityPermissionsPresetDetailsLink: 'Setup details',
      facilityPermissionsPresetDetailsHeader: 'Facility setup details',
      adminManagedSetupDescription: 'For schools and other formal learning contexts',
      selfManagedSetupDescription:
        'For libraries, orphanages, correctional facilities, youth centers, computer labs, and other non-formal learning contexts',
      informalSetupDescription:
        'For parent-child learning, homeschooling, or supplementary individual learning',
      // IDEA This should be a dynamically generated component, based on mappings
      permissionsModalDismissText: 'Close',
      enabledUserAccountDeletionPermissionDetail: 'Guests can create their own accounts',
      disabledUserAccountDeletionPermissionDetail: 'Admins must create all user accounts',
      enabledAccountEditPermissionDetail: 'Users can edit their account information', //  QUESTION might be worth using select?
      disabledAccountEditPermissionDetail: 'Users cannot edit their account information',
      enabledUserPasswordlessLoginPermissionDetail: 'Users can sign in without their passwords',
      enabledUserSelfSignupPermissionDetail: 'Guests can create their own accounts',
      disabledUserSelfSignupPermissionDetail: 'Admins must create all user accounts',
    },
    props: {
      submitText: {
        type: String,
        required: true,
      },
    },
    components: {
      onboardingForm,
      kRadioButton,
      kButton,
      coreModal,
    },
    data() {
      return {
        selectedPermissionPreset: this.currentPermissionPreset,
        permissionPresetDetailsModalShown: false,
        descriptions: {
          formal: this.$tr('adminManagedSetupDescription'),
          informal: this.$tr('selfManagedSetupDescription'),
          nonformal: this.$tr('informalSetupDescription'),
        },
        permissionsMappingsHuman: {},
        permissionPresets,
      };
    },
    methods: {
      setPermissions() {
        this.submitFacilityPermissions(this.selectedPermissionPreset);
        this.$emit('submit');
      },
      showFacilityPermissionsDetails() {
        this.permissionPresetDetailsModalShown = true;
      },
      hideFacilityPermissionsDetails() {
        this.permissionPresetDetailsModalShown = false;
      },
    },
    vuex: {
      actions: {
        submitFacilityPermissions,
      },
      getters: {
        currentPermissionPreset: state => state.onboardingData.preset,
      },
    },
  };

</script>


<style scoped lang="stylus">

  @require '~kolibri.styles.definitions'

  $margin-of-radio-button-text = 32px

  .permission-preset
    cursor: pointer

    &-radio-button
      margin: 0
      margin-top: 16px
      font-size: 14px
      font-weight: bold

    &-description
      color: $core-text-annotation
      font-size: 12px
      display: inline-block
      margin-left: $margin-of-radio-button-text

    &-modal
      &-link
        cursor: pointer
      &-dismiss-button
        text-transform: uppercase
        &-wrapper
          display: block
          text-align: right
          width: 100%


  .permission-preset-human
    list-style: none
    margin-bottom: 8px
    &-title
      font-weight: bold
    &-detail
      line-height: 1.4em
      margin: 0

</style>
