import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const ADDRESS_TYPES = [
    { type: 'Home', icon: 'home' },
    { type: 'Office', icon: 'briefcase' },
    { type: 'Hostel', icon: 'bed' },
];

export const AddressManagementScreen = ({ navigation }) => {
    const { addresses, addAddress, updateAddress, deleteAddress, selectedAddress, selectAddress } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: 'Home',
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        pincode: '',
    });

    const resetForm = () => {
        setFormData({
            type: 'Home',
            name: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            city: '',
            pincode: '',
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.phone || !formData.addressLine1 || !formData.city || !formData.pincode) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        if (editingId) {
            await updateAddress(editingId, formData);
            Alert.alert('Success', 'Address updated successfully');
        } else {
            await addAddress(formData);
            Alert.alert('Success', 'Address added successfully');
        }
        resetForm();
    };

    const handleEdit = (address) => {
        setFormData(address);
        setEditingId(address.id);
        setIsAdding(true);
    };

    const handleDelete = (addressId) => {
        Alert.alert(
            'Delete Address',
            'Are you sure you want to delete this address?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteAddress(addressId)
                },
            ]
        );
    };

    const handleSetDefault = async (address) => {
        // Remove default from all addresses
        for (const addr of addresses) {
            if (addr.isDefault && addr.id !== address.id) {
                await updateAddress(addr.id, { isDefault: false });
            }
        }
        // Set new default
        await updateAddress(address.id, { isDefault: true });
        selectAddress(address);
    };

    if (isAdding) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FF6B35', '#F7931E']}
                    style={styles.header}
                >
                    <TouchableOpacity onPress={resetForm} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{editingId ? 'Edit Address' : 'Add New Address'}</Text>
                </LinearGradient>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.typeSelector}>
                        {ADDRESS_TYPES.map((item) => (
                            <TouchableOpacity
                                key={item.type}
                                style={[
                                    styles.typeButton,
                                    formData.type === item.type && styles.typeButtonActive
                                ]}
                                onPress={() => setFormData({ ...formData, type: item.type })}
                            >
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color={formData.type === item.type ? '#fff' : '#666'}
                                />
                                <Text style={[
                                    styles.typeText,
                                    formData.type === item.type && styles.typeTextActive
                                ]}>
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address Line 1 *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="House/Flat No., Building Name"
                                value={formData.addressLine1}
                                onChangeText={(text) => setFormData({ ...formData, addressLine1: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address Line 2</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Street, Area"
                                value={formData.addressLine2}
                                onChangeText={(text) => setFormData({ ...formData, addressLine2: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Landmark</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nearby landmark"
                                value={formData.landmark}
                                onChangeText={(text) => setFormData({ ...formData, landmark: text })}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, styles.flex1]}>
                                <Text style={styles.label}>City *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="City"
                                    value={formData.city}
                                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                                />
                            </View>

                            <View style={[styles.inputGroup, styles.flex1]}>
                                <Text style={styles.label}>Pincode *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Pincode"
                                    keyboardType="numeric"
                                    value={formData.pincode}
                                    onChangeText={(text) => setFormData({ ...formData, pincode: text })}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <LinearGradient
                                colors={['#4CAF50', '#45a049']}
                                style={styles.saveGradient}
                            >
                                <Text style={styles.saveText}>Save Address</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Delivery Addresses</Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {addresses.map((address) => (
                    <View key={address.id} style={styles.addressCard}>
                        <View style={styles.addressHeader}>
                            <View style={styles.addressTypeContainer}>
                                <Ionicons
                                    name={ADDRESS_TYPES.find(t => t.type === address.type)?.icon || 'location'}
                                    size={20}
                                    color="#FF6B35"
                                />
                                <Text style={styles.addressType}>{address.type}</Text>
                            </View>
                            {address.isDefault && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultText}>Default</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.addressName}>{address.name}</Text>
                        <Text style={styles.addressPhone}>{address.phone}</Text>
                        <Text style={styles.addressText}>
                            {address.addressLine1}
                            {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                            {address.landmark ? `\nNear ${address.landmark}` : ''}
                            {`\n${address.city} - ${address.pincode}`}
                        </Text>

                        <View style={styles.addressActions}>
                            {!address.isDefault && (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleSetDefault(address)}
                                >
                                    <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
                                    <Text style={styles.actionText}>Set Default</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleEdit(address)}
                            >
                                <Ionicons name="create-outline" size={20} color="#2196F3" />
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDelete(address.id)}
                            >
                                <Ionicons name="trash-outline" size={20} color="#F44336" />
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setIsAdding(true)}
                >
                    <Ionicons name="add-circle" size={24} color="#FF6B35" />
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#e0e0e0',
        gap: 8,
    },
    typeButtonActive: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    typeTextActive: {
        color: '#fff',
    },
    form: {
        gap: 16,
    },
    inputGroup: {
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    saveButton: {
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    saveGradient: {
        padding: 18,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addressCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    addressType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    defaultBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    defaultText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    addressName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    addressPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    addressActions: {
        flexDirection: 'row',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#FF6B35',
        borderStyle: 'dashed',
        gap: 12,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B35',
    },
});
