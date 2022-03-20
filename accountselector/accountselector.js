import { LightningElement, wire, track, api } from 'lwc';
import getAccountList from '@salesforce/apex/getAccountRecordsController.getAccountList'
import getselectedAccount from '@salesforce/apex/getAccountRecordsController.getselectedAccount'
import getProfilePicture from '@salesforce/apex/getAccountRecordsController.getProfilePicture'

const columns = [
    { label: 'Account Id', fieldName: 'Id' },
    { label: 'Account Name', fieldName: 'Name' },

];
export default class accountselector extends LightningElement {
    error;
    columns = columns;
    account = [];
    selectedRow;
    accountrecord;
    profilepicurl;
    showLoadingSpinner;
    connectedCallback() {
        getAccountList()
            .then((result, error) => {
                if (result) {
                    this.account = result;
                } else if (error) {
                    console.error(error);
                }
            })
    }

    handleRowSelection = event => this.selectedRow = event.detail.selectedRows[0];

    openModal() {
        this.showLoadingSpinner = true;
        getselectedAccount({ accId: this.selectedRow.Id })
            .then((result, error) => {
                if (result) {
                    this.profilepicurl = null;
                    getProfilePicture({ uid: result.Owner.Id })
                        .then((result, error) => {
                            if (result) {
                                this.profilepicurl = result.SmallPhotoUrl;
                            } else if (error) {
                                console.error(error);
                            }
                        })
                    this.showLoadingSpinner = false;
                    this.accountrecord = result;
                } else if (error) {
                    console.error(error);
                }
            })
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.profilepicurl = null;
        this.accountrecord = null;
    }
}