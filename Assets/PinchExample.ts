import {Instantiator} from "SpectaclesSyncKit/Components/Instantiator"
import {InstantiationOptions} from "SpectaclesSyncKit/Components/Instantiator"
import {SessionController } from "SpectaclesSyncKit/Core/SessionController"
import {StorageProperty} from "SpectaclesSyncKit/Core/StorageProperty"
import {SyncEntity} from "SpectaclesSyncKit/Core/SyncEntity"
import {SyncKitLogger} from "SpectaclesSyncKit/Utils/SyncKitLogger"
import { SIK } from './SpectaclesInteractionKit/SIK';

@component
export class PinchExample extends BaseScriptComponent {
    
  private gestureModule: GestureModule = require('LensStudio:GestureModule');
    
  @input
  private readonly prefabObj: ObjectPrefab
    
   @input
    instantiator : Instantiator
    
  onAwake() {

    this.createEvent('OnStartEvent').bind(() => {
      this.onStart();
    });

  }

  onStart() {
    // Retrieve HandInputData from SIK's definitions.
    let handInputData = SIK.HandInputData;

    // Fetch the TrackedHand for left and right hands.
    let leftHand = handInputData.getHand('left');
    let rightHand = handInputData.getHand('right');

    // Add print callbacks for whenever these hands pinch.
    leftHand.onPinchDown.add(() => {
      this.spawn(leftHand.indexTip.position);
      print(
        `The left hand has pinched. The tip of the left index finger is: ${leftHand.indexTip.position}.`
      );
    });
    rightHand.onPinchDown.add(() => {
      print(
        `The right hand has pinched. The tip of the right index finger is: ${rightHand.indexTip.position}.`
      );
    });
  }

   
    
    spawn(position: vec3) {

        if (this.instantiator.isReady()) {
            // Spawn piece using the Sync Framework instantiator, set local start position
            const options = new InstantiationOptions()
            options.localPosition = position //new vec3(0,-25,0)
            const newObj = this.instantiator.instantiate(this.prefabObj, options)
        }
    }
    
    
}