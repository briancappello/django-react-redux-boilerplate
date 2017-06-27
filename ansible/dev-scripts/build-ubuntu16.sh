#!/bin/bash

# build-ubuntu16.sh vm_name static_ip_address

vm_name="$1"
vm_image="$vm_name.img"

static_ip="$2"
gateway_ip="$(echo $static_ip | cut -d '.' -f 1-3).1"

first_boot_orig="first-boot-ubuntu.sh.orig"
first_boot="first-boot-ubuntu.sh"
cp $first_boot_orig $first_boot
sed -i "s/STATIC_IP/$static_ip/" $first_boot
sed -i "s/GATEWAY_IP/$gateway_ip/" $first_boot

virt-builder ubuntu-16.04 \
	--output "$vm_image" \
	--hostname "$vm_name" \
	--ssh-inject root \
	--install python \
	--firstboot $first_boot

rm $first_boot
