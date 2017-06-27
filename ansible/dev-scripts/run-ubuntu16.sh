#!/bin/bash

# run-ubuntu16.sh vm_name

vm_name="$1"
vm_image="$vm_name.img"
dest="/var/lib/libvirt/images/$vm_image"
mv $vm_image $dest
chown nobody:kvm $dest

virt-install --import --name "$vm_name" \
	--ram 2048 \
	--disk path="$dest" \
	--os-variant ubuntu16.04 \
	--noautoconsole

