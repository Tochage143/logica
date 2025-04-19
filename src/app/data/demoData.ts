import { FileSystemItem } from '../types';

export const demoData: FileSystemItem[] = [
  {
    id: '1',
    name: 'Daily Journal',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: '1-1',
        name: '18-04-2025',
        type: 'file',
        content: '# 18-04-2025\n\n',
        parentId: '1'
      }
    ],
    parentId: null
  },
  {
    id: '2',
    name: 'Dsa',
    type: 'folder',
    isExpanded: false,
    children: [],
    parentId: null
  },
  {
    id: '3',
    name: 'Excalidraw',
    type: 'folder',
    isExpanded: false,
    children: [],
    parentId: null
  },
  {
    id: '4',
    name: 'Javascript',
    type: 'folder',
    isExpanded: false,
    children: [],
    parentId: null
  },
  {
    id: '5',
    name: 'Mca',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: '5-1',
        name: 'Seconds semester',
        type: 'folder',
        isExpanded: true,
        children: [
          {
            id: '5-1-1',
            name: 'Cloud 1',
            type: 'folder',
            isExpanded: false,
            children: [],
            parentId: '5-1'
          },
          {
            id: '5-1-2',
            name: 'Cloud 2',
            type: 'folder',
            isExpanded: true,
            children: [
              {
                id: '5-1-2-1',
                name: 'Unit 1',
                type: 'folder',
                isExpanded: false,
                children: [],
                parentId: '5-1-2'
              },
              {
                id: '5-1-2-2',
                name: 'Unit 2',
                type: 'folder',
                isExpanded: true,
                children: [
                  {
                    id: '5-1-2-2-1',
                    name: 'Cloud Computing',
                    type: 'file',
                    content: '# Cloud Computing\n\nCloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user.',
                    parentId: '5-1-2-2'
                  },
                  {
                    id: '5-1-2-2-2',
                    name: 'Grid Computing',
                    type: 'file',
                    content: '# Grid Computing\n\nGrid computing is the use of widely distributed computer resources to reach a common goal.',
                    parentId: '5-1-2-2'
                  },
                  {
                    id: '5-1-2-2-3',
                    name: 'Google App Engine',
                    type: 'file',
                    content: '# Google App Engine\n\nGoogle App Engine is a Platform as a Service and cloud computing platform for developing and hosting web applications in Google-managed data centers.',
                    parentId: '5-1-2-2'
                  },
                  {
                    id: '5-1-2-2-4',
                    name: 'Programming on Amazon AWS',
                    type: 'file',
                    content: '# Programming on Amazon AWS\n\nAmazon Web Services offers reliable, scalable, and inexpensive cloud computing services.',
                    parentId: '5-1-2-2'
                  },
                  {
                    id: '5-1-2-2-5',
                    name: 'Microsoft Azure',
                    type: 'file',
                    content: '# Microsoft Azure\n\nMicrosoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services.',
                    parentId: '5-1-2-2'
                  }
                ],
                parentId: '5-1-2'
              },
              {
                id: '5-1-2-3',
                name: 'Unit 3',
                type: 'folder',
                isExpanded: true,
                children: [
                  {
                    id: '5-1-2-3-1',
                    name: 'Overview of Emerging Trends in Cloud',
                    type: 'file',
                    content: '# Overview of Emerging Trends in Cloud\n\nCloud computing continues to evolve with new trends emerging regularly.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-2',
                    name: 'Multi-Cloud Environment',
                    type: 'file',
                    content: '# Multi-Cloud Environment\n\nA multi-cloud strategy is the use of two or more cloud computing services.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-3',
                    name: 'Omni Cloud',
                    type: 'file',
                    content: '# Omni Cloud\n\nOmni-cloud refers to a cloud setup that provides a seamless experience across different cloud platforms.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-4',
                    name: 'Blockchain Technology',
                    type: 'file',
                    content: '# Blockchain Technology\n\nBlockchain is a distributed ledger technology that can record transactions between parties efficiently.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-5',
                    name: 'Types of Blockchain Technology',
                    type: 'file',
                    content: '# Types of Blockchain Technology\n\nThere are several types of blockchain technology, including public, private, and consortium blockchains.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-6',
                    name: 'Cloud AI',
                    type: 'file',
                    content: '# Cloud AI\n\nCloud AI refers to artificial intelligence services provided through cloud computing platforms.',
                    parentId: '5-1-2-3'
                  },
                  {
                    id: '5-1-2-3-7',
                    name: 'Edge Computing',
                    type: 'file',
                    content: '# Edge Computing\n\nEdge computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed.',
                    parentId: '5-1-2-3'
                  }
                ],
                parentId: '5-1-2'
              },
              {
                id: '5-1-2-4',
                name: 'Unit 4',
                type: 'folder',
                isExpanded: true,
                children: [
                  {
                    id: '5-1-2-4-1',
                    name: 'Resource Pooling',
                    type: 'file',
                    content: '# Resource Pooling\n\nResource pooling is a computing model where multiple computing resources are pooled to serve multiple consumers.',
                    parentId: '5-1-2-4'
                  },
                  {
                    id: '5-1-2-4-2',
                    name: 'Commoditization of Data Centers',
                    type: 'file',
                    content: '# Commoditization of Data Centers\n\nData center commoditization refers to the standardization of data center services.',
                    parentId: '5-1-2-4'
                  }
                ],
                parentId: '5-1-2'
              }
            ],
            parentId: '5-1'
          }
        ],
        parentId: '5'
      }
    ],
    parentId: null
  },
  {
    id: '6',
    name: 'Notes_all',
    type: 'file',
    content: '# All Notes\n\nThis file contains all consolidated notes.',
    parentId: null
  }
];