import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AddAddressDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <form>
        {trigger}
        <DialogContent className="flex max-h-[95vh] max-w-[70vw] flex-col overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add new address here</DialogTitle>
            <DialogDescription>
              Required fields are marked *. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <form>
            <div className="flex flex-col max-md:gap-4">
              {/* Address details section */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="street-number">
                      Street number
                    </Label>
                    <Input id="street-number" placeholder="Enter street number" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="street-name">
                      Street name*
                    </Label>
                    <Input id="street-name" placeholder="Enter street" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="building">
                      Building
                    </Label>
                    <Input id="building" placeholder="Enter building number" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="apartment">
                      Apartment / Suite
                    </Label>
                    <Input id="apartment" placeholder="Enter apartment number" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="po-box">
                      PO Box
                    </Label>
                    <Input id="po-box" placeholder="Enter PO Box" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="city">
                      City*
                    </Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="postal-code">
                      Postal Code*
                    </Label>
                    <Input id="postal-code" placeholder="Enter postal code" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="region">
                      Region
                    </Label>
                    <Input id="region" placeholder="Enter region" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="state">
                      State/Province
                    </Label>
                    <Input id="state" placeholder="Enter state/province" />
                  </div>
                  <div className="col-span-1">
                    <Label className="pb-2" htmlFor="country">
                      Country*
                    </Label>
                    <Input id="country" placeholder="Enter country" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="street-info" className="pb-2">
                      Additional street info
                    </Label>
                    <Textarea id="street-info" placeholder="Enter additional street info" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address-info" className="pb-2">
                      Additional address info
                    </Label>
                    <Textarea id="address-info" placeholder="Enter address street info" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="italic">You need to choose a type for your new address*</p>
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Set as shipping address</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Set as billing address</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Set as default shipping address</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Set as default billing address</Label>
                </div>
              </div>
            </div>
          </form>
          <DialogFooter className="max-sm:gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="max-sm:mt-5">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
