import { Component, Input, OnInit, Output } from "@angular/core";
import { Wallet } from "../../../models/wallet";
import { Transaction } from "../../../models/transaction";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "wallet-dialog",
  templateUrl: "wallet-dialog.html",
})
export class WalletDialogComponent implements OnInit {
  private wallet: Wallet = new Wallet();

  constructor(public dialogRef: MatDialogRef<WalletDialogComponent>) {}

  ngOnInit() {}

  public setWallet(wallet: Wallet) {
    if (!Wallet.isEmpty(wallet)) {
      this.wallet = wallet;
    }
  }

  private cancel() {
    this.dialogRef.close(null);
  }
}
